import React from 'react';
import { Mail, Lock, User } from 'lucide-react';

export default function InputField({ type, placeholder, value, onChange, name, icon }) {
    const getIcon = () => {
        switch(icon) {
            case 'email':
                return <Mail className="w-5 h-5 text-gray-500" />;
            case 'password':
                return <Lock className="w-5 h-5 text-gray-500" />;
            case 'user':
                return <User className="w-5 h-5 text-gray-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="relative w-full">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                {getIcon()}
            </div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:border-red-700 transition-all text-gray-700"
            />
        </div>
    );
}