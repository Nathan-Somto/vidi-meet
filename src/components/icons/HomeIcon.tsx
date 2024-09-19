import { Svg, Path } from 'react-native-svg';
export function HomeIcon(props: SvgProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 25" fill="none">
      <Path
        d="M12 18.49V15.49M9.02 3.34004L3.63 7.54004C2.73 8.24004 2 9.73004 2 10.86V18.27C2 20.59 3.89 22.49 6.21 22.49H17.79C20.11 22.49 22 20.59 22 18.28V11C22 9.79004 21.19 8.24004 20.2 7.55004L14.02 3.22004C12.62 2.24004 10.37 2.29004 9.02 3.34004Z"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
