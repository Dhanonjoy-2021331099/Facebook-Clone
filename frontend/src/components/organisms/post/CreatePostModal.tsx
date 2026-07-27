import React, { useState } from 'react';
import axios from 'axios';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async () => {
    if (!content.trim()) {
      alert('Please write something!');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post('http://localhost:5000/posts', {
        caption: content,
        image: '',
        user: {
          _id: 'user123',
          fullName: 'Jibon Roy',
          username: 'jibon',
          dp: 'https://random.imagecdn.app/200/200',
        },
      });

      console.log('Post Created:', response.data);
      alert('Post Created Successfully!');

      setContent('');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Create Post Error:', error);
      alert('Failed to create post!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-xl dark:bg-neutral-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create post
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            ✕
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="min-h-[120px] w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-gray-100"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreatePost}
            disabled={isSubmitting || !content.trim()}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
