import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

export default function DarkModeToggle() {
  const { dark, toggle } = useContext(DarkModeContext);
  return <button onClick={toggle}>{dark ? '🌙' : '☀️'}</button>;
}