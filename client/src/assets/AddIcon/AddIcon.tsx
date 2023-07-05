interface IconProps {
  width?: string;
  height?: string;
}

export const AddIcon = ({ width = "24", height = "24" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
    >
      <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
    </svg>
  );
};
