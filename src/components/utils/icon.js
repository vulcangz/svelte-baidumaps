import { createSymbol } from './factory'

// icons from Material Design icons by Google
// @see {@link: https://github.com/google/material-design-icons/blob/master/src/maps/|Material Design icons by Google}
export const ICONS = {
	PLACE_PIN:
		'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
	LOCATION_PIN:
		'M12,2L12,2C8.13,2,5,5.13,5,9c0,1.74,0.5,3.37,1.41,4.84c0.95,1.54,2.2,2.86,3.16,4.4c0.47,0.75,0.81,1.45,1.17,2.26 C11,21.05,11.21,22,12,22h0c0.79,0,1-0.95,1.25-1.5c0.37-0.81,0.7-1.51,1.17-2.26c0.96-1.53,2.21-2.85,3.16-4.4 C18.5,12.37,19,10.74,19,9C19,5.13,15.87,2,12,2z M12,11.75c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5 S13.38,11.75,12,11.75z',
	PIN_DROP:
		'M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z'
};

/**
 * 矢量图标可选参数的默认值
 * @type {{ anchor: object{width: number, height: number}, rotation: number, fillColor: string,
 *          fillOpacity: number, scale: number,
 *          strokeColor: string, strokeWeight: number }}
 */
export const defaultSymbolIconOptions = {
	anchor: { width: 0, height: 0 }, // 符号的位置偏移值
	rotation: 0, // 矢量图标的旋转角度
	fillColor: 'red',
	fillOpacity: 0.8, // 矢量图标填充透明度,范围0~1
	scale: 1.2, // 设置矢量图标的缩放比例
	strokeColor: '#555',
	strokeWeight: 1, //线宽
};

export function createDefaultSymbolIcon(bdmap) {
	return createSymbol(bdmap, {
		path: ICONS['PLACE_PIN'],
		opts: defaultSymbolIconOptions,
	});
}