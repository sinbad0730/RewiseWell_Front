const StyledContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
      style={{
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0.1, 0.1, 0.1, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        background: '#070D0A',
        padding: '1.5rem',
        margin: '15rem',
        marginTop: '-1rem'
    
      }}
    >
      {children}
    </div>
  );
  
  export default StyledContainer;
  