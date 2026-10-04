function ToolbarButton({ children }) {
    return (
        <button
            type="button"
            className="px-2 py-1.5 rounded hover:bg-surface-container-high hover:text-on-surface transition text-sm"
        >
            {children}
        </button>
    );
}

export default ToolbarButton;