import fs from 'fs';
import path from 'path';

export function copyDirectory(src: string, dist: string) {
	fs.readdir(src, (err, items) => {
		if(err) {
			console.error(err);
			return;
		}

		for(const item of items) {
			const srcPath = path.join(src, item);
			const distPath = path.join(dist, item);

			fs.stat(srcPath, (err, stats) => {
				if(err) {
					console.error(err);
					return;
				}

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
