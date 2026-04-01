/**
 * Chevron — path exacto del Figma (16px/Chevron)
 * Usa currentColor — heredar color del padre via CSS
 * Tamaño natural: 6×10px — centrar en contenedor 16×16
 */
export default function Chevron() {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.75533 10C0.968528 10 1.13909 9.92916 1.27919 9.78749L5.72589 5.57851C5.90863 5.40732 5.99391 5.22432 6 5C6 4.78158 5.90863 4.58678 5.73198 4.42149L1.28528 0.212515C1.13909 0.0708383 0.962437 0 0.75533 0C0.335025 0 0 0.324675 0 0.726092C0 0.9268 0.0852792 1.1157 0.237563 1.25738L4.20305 5.0059L0.237563 8.74262C0.0852792 8.8843 0 9.0732 0 9.27391C0 9.67532 0.335025 10 0.75533 10Z"
        fill="currentColor"
      />
    </svg>
  )
}
