import { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';

function FileUploadApp() {
  const [files, setFiles] = useState([]);
  const [progresses, setProgresses] = useState({});
  const [statuses, setStatuses] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Format bytes to human readable
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Generate preview URL for image
  const getPreviewUrl = (file) => {
    return URL.createObjectURL(file);
  };

  // Remove file
  const removeFile = useCallback((index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    // Revoke preview URLs to prevent memory leaks
    URL.revokeObjectURL(getPreviewUrl(files[index]));
    setProgresses({});
    setStatuses({});
  }, [files]);

  // Handle file selection
  const handleFiles = useCallback((selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map(file => ({ file }));
    setFiles(prev => [...prev, ...newFiles]);
    setMessage('');
  }, []);

  // Trigger file input click
  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Drag handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  }, [handleFiles]);

  // Upload single file
  const uploadFile = useCallback(async (fileObj, index) => {
    const { file } = fileObj;
    const formData = new FormData();
    formData.append('file', file);
    
    const xhr = new XMLHttpRequest();
    
    // Update progress
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgresses(prev => ({ ...prev, [index]: percent }));
      }
    });

    // Success
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        setStatuses(prev => ({ ...prev, [index]: 'success' }));
        setMessage(`File "${file.name}" uploaded successfully!`);
      } else {
        setStatuses(prev => ({ ...prev, [index]: 'error' }));
        setMessage(`Upload failed for "${file.name}"`);
      }
      // Reset progress after delay
      setTimeout(() => {
        setProgresses(prev => ({ ...prev, [index]: 0 }));
      }, 2000);
    });

    // Error
    xhr.addEventListener('error', () => {
      setStatuses(prev => ({ ...prev, [index]: 'error' }));
      setMessage(`Network error uploading "${file.name}"`);
    });

    xhr.open('POST', 'https://httpbin.org/post');
    xhr.send(formData);

    // Set initial status
    setStatuses(prev => ({ ...prev, [index]: 'uploading' }));
  }, []);

  // Upload all files
  const handleUploadAll = useCallback(() => {
    files.forEach((fileObj, index) => uploadFile(fileObj, index));
    setMessage('Starting uploads...');
  }, [files, uploadFile]);

  // Reset all
  const handleReset = useCallback(() => {
    files.forEach((_, index) => {
      if (files[index]?.previewUrl) URL.revokeObjectURL(files[index].previewUrl);
    });
    setFiles([]);
    setProgresses({});
    setStatuses({});
    setMessage('');
  }, [files]);

  // Prevent navigation during drag
  useEffect(() => {
    const handleDragEnterGlobal = (e) => {
      if (e.dataTransfer.types.includes('Files')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('dragover', handleDragEnterGlobal);
    document.addEventListener('dragenter', handleDragEnterGlobal);

    return () => {
      document.removeEventListener('dragover', handleDragEnterGlobal);
      document.removeEventListener('dragenter', handleDragEnterGlobal);
    };
  }, []);

  return (
    <div className="app-container" role="main" aria-label="File Upload App">
      <header>
        <h1>🚀 Modern File Upload</h1>
        <p>Drag & drop files or click to upload with real-time progress</p>
      </header>

      {/* Drop Zone */}
      <div 
        ref={dropZoneRef}
        className={`drop-zone ${isDragging ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFilePicker}
        role="button"
        tabIndex={0}
        aria-label="Drop files here or click to select"
        aria-describedby="upload-instructions"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFilePicker();
          }
        }}
      >
        <div className="drop-zone-content">
          <div className="upload-icon">📁</div>
          <p>Drop files here or click to browse</p>
          <small id="upload-instructions">Supports images and other files</small>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="file-input"
        onChange={(e) => handleFiles(e.target.files)}
        aria-hidden="true"
        accept="*/*"
      />

      {/* Files List */}
      {files.length > 0 && (
        <div className="files-list" aria-label="Selected files">
          <h2>Selected Files ({files.length})</h2>
          <div className="files-grid">
            {files.map((fileObj, index) => {
              const { file } = fileObj;
              const isImage = file.type.startsWith('image/');
              const previewUrl = isImage ? getPreviewUrl(file) : null;
              const prog = progresses[index] || 0;
              const status = statuses[index];

              return (
                <div key={index} className="file-item">
                  {previewUrl && (
                    <div className="file-preview">
                      <img src={previewUrl} alt="" />
                    </div>
                  )}
                  <div className="file-info">
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">{formatBytes(file.size)}</div>
                  </div>
                  
                  {prog > 0 && (
                    <div className="progress-container" role="progressbar" 
                         aria-valuenow={prog} aria-valuemin="0" aria-valuemax="100"
                         aria-label={`Upload progress ${prog}%`}>
                      <div 
                        className={`progress-bar ${status}`}
                        style={{ width: `${prog}%` }}
                      />
                    </div>
                  )}

                  <div className={`status ${status}`}>
                    {status === 'uploading' && 'Uploading...'}
                    {status === 'success' && '✅ Success'}
                    {status === 'error' && '❌ Error'}
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Controls */}
      {files.length > 0 && (
        <div className="controls">
          <button 
            className="upload-btn"
            onClick={handleUploadAll}
            disabled={files.length === 0}
            aria-label="Upload all selected files"
          >
            🚀 Upload All ({files.length})
          </button>
          <button 
            className="reset-btn"
            onClick={handleReset}
            aria-label="Clear all files"
          >
            🗑️ Reset
          </button>
        </div>
      )}

      {/* Message */}
      {message && (
        <div className="message" role="alert" aria-live="polite">
          {message}
        </div>
      )}

      <footer>
        <p>✨ Features: Drag & Drop • Progress Bars • Image Preview • Multiple Files • ARIA Accessible</p>
      </footer>
    </div>
  );
}

export default FileUploadApp;

