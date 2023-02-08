import fs from 'fs';

/**
 * scssファイルをnode-sassからdart-sassに変換する（したい）
 * @param scssFilePath コンバート元のファイルパス
 * @param distPath コンバート後にファイルを吐き出すパス
 */
export default function convertScss(scssFilePath: string, distPath: string) {
	fs.readFile(scssFilePath, {encoding: 'utf8' }, (err, data) => {
		if(err) {
			console.log(err);
			return;
		}

		let outputData = '';
		outputData += '// 書き出し後やで';
		outputData += '\n\n';
		outputData += data;

		fs.writeFile(distPath, outputData, 'utf8', (err) => {
			if(err) {
				console.log(err);
				return;
			}
		});

		// postcss.parse(data, { from: scssFilePath }).walk((node) => {
		// 	console.log(node);
		// });

		// fs.copyFile(scssFilePath, distPath, (err) => {
		// 	if(err) {
		// 		console.log(err);
		// 		return;
		// 	}
		// })
	})
}
