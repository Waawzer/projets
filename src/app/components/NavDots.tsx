'use client';

interface NavDotsProps {
  total: number;
  active: number;
  onDotClick: (index: number) => void;
}

const NavDots = ({ total, active, onDotClick }: NavDotsProps) => {
  return (
    <div className="nav-dots">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          className={`nav-dot ${active === index ? 'active' : ''}`}
          onClick={() => onDotClick(index)}
          aria-label={`Aller à la section ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default NavDots; 