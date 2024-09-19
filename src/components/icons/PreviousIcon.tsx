import Svg, { Path } from 'react-native-svg';

export function PreviousIcon(props: SvgProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 25" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 2.5C7.55228 2.5 8 2.94772 8 3.5V4.5H16V3.5C16 2.94772 16.4477 2.5 17 2.5C17.5523 2.5 18 2.94772 18 3.5V4.5H19C20.6569 4.5 22 5.84315 22 7.5V14.5C22 15.0523 21.5523 15.5 21 15.5C20.4477 15.5 20 15.0523 20 14.5V10.5H4V19.5C4 20.0523 4.44772 20.5 5 20.5H10C10.5523 20.5 11 20.9477 11 21.5C11 22.0523 10.5523 22.5 10 22.5H5C3.34315 22.5 2 21.1569 2 19.5V7.5C2 5.84315 3.34315 4.5 5 4.5H6V3.5C6 2.94772 6.44772 2.5 7 2.5ZM5 6.5C4.44772 6.5 4 6.94772 4 7.5V8.5H20V7.5C20 6.94772 19.5523 6.5 19 6.5H5Z"
        fill={props.color}
      />
      <Path
        d="M16.7071 18.2071C17.0976 17.8166 17.0976 17.1834 16.7071 16.7929C16.3166 16.4024 15.6834 16.4024 15.2929 16.7929L13.2929 18.7929C12.9024 19.1834 12.9024 19.8166 13.2929 20.2071L15.2929 22.2071C15.6834 22.5976 16.3166 22.5976 16.7071 22.2071C17.0976 21.8166 17.0976 21.1834 16.7071 20.7929L15.4142 19.5L16.7071 18.2071Z"
        fill={props.color}
      />
      <Path
        d="M21.7071 16.7929C22.0976 17.1834 22.0976 17.8166 21.7071 18.2071L20.4142 19.5L21.7071 20.7929C22.0976 21.1834 22.0976 21.8166 21.7071 22.2071C21.3166 22.5976 20.6834 22.5976 20.2929 22.2071L18.2929 20.2071C17.9024 19.8166 17.9024 19.1834 18.2929 18.7929L20.2929 16.7929C20.6834 16.4024 21.3166 16.4024 21.7071 16.7929Z"
        fill={props.color}
      />
    </Svg>
  );
}
