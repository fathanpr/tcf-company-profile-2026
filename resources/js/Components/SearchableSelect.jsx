import React from 'react';
import Select from 'react-select';

export default function SearchableSelect({
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    error,
    isMulti = false,
    label,
    className = ""
}) {
    // Custom Styles for React Select to match Tailwind Theme
    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: '#f8fafc', // slate-50
            borderColor: state.isFocused ? '#f97316' : '#e2e8f0', // orange-500 : slate-200
            padding: '4px',
            borderRadius: '0.75rem', // rounded-xl
            boxShadow: 'none',
            '&:hover': {
                borderColor: state.isFocused ? '#f97316' : '#cbd5e1', // slate-300
            }
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#f97316' // orange-500
                : state.isFocused
                    ? '#fff7ed' // orange-50
                    : 'white',
            color: state.isSelected ? 'white' : '#1e293b', // slate-800
            cursor: 'pointer',
            fontSize: '0.875rem', // text-sm
            fontWeight: '500',
        }),
        singleValue: (base) => ({
            ...base,
            color: '#1e293b', // slate-800
            fontWeight: '600',
        }),
        placeholder: (base) => ({
            ...base,
            color: '#94a3b8', // slate-400
            fontSize: '0.875rem',
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#ffedd5', // orange-100
            borderRadius: '0.375rem',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#c2410c', // orange-700
            fontWeight: '700',
            fontSize: '0.75rem',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: '#c2410c',
            ':hover': {
                backgroundColor: '#fed7aa', // orange-200
                color: '#9a3412', // orange-800
            },
        }),
        menu: (base) => ({
            ...base,
            borderRadius: '0.75rem',
            overflow: 'hidden',
            zIndex: 50,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }),
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                    {label}
                </label>
            )}

            <Select
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                isMulti={isMulti}
                styles={customStyles}
                classNamePrefix="react-select"
                isSearchable
                isClearable
            />

            {error && (
                <p className="text-sm text-red-600 font-bold mt-1">{error}</p>
            )}
        </div>
    );
}
