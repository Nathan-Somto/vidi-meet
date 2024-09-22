import Svg, { Path } from 'react-native-svg';

export function VideoIcon(props: SvgProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 22 17" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.2969 12.0383C15.3778 13.8704 13.8992 15.4196 11.9946 15.4975C11.8543 15.5034 5.01531 15.4896 5.01531 15.4896C3.11996 15.6335 1.46115 14.2715 1.31165 12.4463C1.30039 12.3103 1.30346 4.97219 1.30346 4.97219C1.21949 3.13815 2.69604 1.58499 4.60163 1.50418C4.74396 1.49728 11.5738 1.51009 11.5738 1.51009C13.4783 1.36818 15.1423 2.74001 15.2897 4.57405C15.3 4.7061 15.2969 12.0383 15.2969 12.0383Z"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.3 6.47984L18.593 3.78484C19.409 3.11684 20.633 3.69884 20.632 4.75184L20.62 12.1008C20.619 13.1538 19.394 13.7308 18.58 13.0628L15.3 10.3678"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
