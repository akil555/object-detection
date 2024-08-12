// src/ImageUploader.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPreview(`data:image/jpeg;base64,${response.data.image}`);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-10l mx-auto bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-1 px-2 text-xs bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Upload
                    </button>
                </form>
                {preview && (
                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-900">Image Preview:</h3>
                        <div className="relative">
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 w-full h-auto max-w-full max-h-[80vh] object-contain"
                                style={{ maxWidth: '100%', maxHeight: '80vh' }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
