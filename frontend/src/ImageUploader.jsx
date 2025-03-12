import React, { useState } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiX } from 'react-icons/fi';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError('');
            setSuccess('');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError('');
            setSuccess('');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setError('Please select an image to upload.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPreview(`data:image/jpeg;base64,${response.data.image}`);
            setSuccess('Image uploaded successfully!');
            setError('');
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Failed to upload image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
        setError('');
        setSuccess('');
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {!preview ? (
                            <div className="text-center">
                                <FiUploadCloud className="mx-auto text-gray-400 text-4xl" />
                                <p className="text-gray-500 mt-2">Drag & drop an image here</p>
                                <p className="text-gray-400">or</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="fileInput"
                                />
                                <label
                                    htmlFor="fileInput"
                                    className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 cursor-pointer"
                                >
                                    Select Image
                                </label>
                            </div>
                        ) : (
                            <div className="relative">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    <button
                        type="submit"
                        className={`w-full py-2 rounded-lg text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition`}
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ImageUploader;
