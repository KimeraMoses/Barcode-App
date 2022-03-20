import styles from './Navbar.styles.scss';

export function Navbar() {
  const { navbar } = styles;
  return (
    <div className={navbar}>
      <div>Navbar</div>
    </div>
  );
}
