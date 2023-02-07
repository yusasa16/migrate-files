import fs from 'fs';
import path from 'path';

/**
 * ディレクトリを複製する
 * @param src 複製元のディレクトリパス
 * @param dist コピーを吐き出す先のディレクトリパス
 */
export function copyDirectory(src: string, dist: string) {
	// コピー先のディレクトリが存在しなかった場合、ディレクトリを作成する。
	if(!fs.existsSync(dist)) {
		fs.mkdir(dist, { recursive: true }, (err) => {
			if(err) {
				console.error(err);
				return;
			}
			console.log('dist directory has been created.');
		})
	}

	// コピー元の第一階層を取得
	fs.readdir(src, (err, items) => {
		if(err) {
			console.error(err);
			return;
		}

		// 第一階層のアイテムごとにループ
		for(const item of items) {
			const srcPath = path.join(src, item);
			const distPath = path.join(dist, item);

			fs.stat(srcPath, (err, stats) => {
				if(err) {
					console.error(err);
					return;
				}

				// ファイルであればコピー、
				// ディレクトリであればコピー先にディレクトリを作成して再度関数実行
				if(stats.isFile()) {
					fs.copyFile(srcPath, distPath, (err) => {
						if(err) {
							console.error(err);
						}
					});
				} else if (stats.isDirectory()) {
					fs.mkdir(distPath, {recursive: true}, (err) => {
						if(err) {
							console.error(err);
							return;
						}
						copyDirectory(srcPath, distPath);
					});
				}
			});
		}
	});
}
