const usetube = require('./dist/usetube.js')


const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 3000;
const fs = require('fs');
app.use(cors());
var crawler = require('youtube-crawler');
app.get('/',(req,res)=>{
   res.sendFile('./index.html', {root: __dirname })
})
let test
app.get('/getVideo', async (req, res, next) => {

  // test = await usetube.getChannelVideos('UC0EXZm7W7F7px2rcqecyC6w', new Date(Date.now() - 7*24*60*60*1000))
  // test = await usetube.getChannelVideos('UC2_OG1L8DLTzQ7UrZVOk7OA') // +50 videos
  // test = await usetube.getChannelVideos('UCkJGRPw2yeGOwpNIRXrbOvA') // 10 videos
  // test = await usetube.getVideoDesc('7meUp9JAQyw')
  // test = await usetube.getChannelDesc('UCp5KUL1Mb7Kpfw10SGyPumQ')
  // test = await usetube.searchChannel('vision radio')
  // test = await usetube.searchChannel('noisia', 'EtoGEhBsYXRlIG5pZ2h0IHRhbGVzGtgFRWdJUUFrZ1VnZ0VZVlVORGJYZFRkbWM0UkdwSGMwZ3lVek5oYzFFM1JUQlJnZ0VZVlVOcFEwbzJUa0k0YjNWU2EyeDROWFkxVG1KNWRFcEJnZ0VZVlVOaGVHSXlWRTFuU2tKVVFqSk1SMk5yYlY4MllVRlJnZ0VZVlVOeExXZzJMVEJPYVhWUGIxQlRVaTEzY1ZSV09FVjNnZ0VZVlVOcWJEUXhjMWRqZFVkMVpHNHlkalpwWVMxUWRsSjNnZ0VZVlVNMlFVNXNlVVJVY21WMVMydFpUVzlCY0hnd1NUQm5nZ0VZVlVOMlJFdHlUbHBMYkZsNlMweERNMkZoV1RocFluaG5nZ0VZVlVORVowaEhSMVZMUWtRMVpITkJUM2h2TUcxcE5ITlJnZ0VZVlVOM2NGcGhhakZEWDJkc2RHbFlRMVZNY1d0SVYxUm5nZ0VZVlVOVVZqZFBiV1pqVlZnNGFYWndVbWQyYzA1WVFsbEJnZ0VZVlVOR0xYTXRjVFpqZDBOV1IwZHdjazR5TFRsNExVRm5nZ0VZVlVOWU1FSnVlR2RVTms1R2VWWnphRlZCUzJsSE1VSm5nZ0VZVlVOVVlrVkJNRWRtYjJaeVJXMUlOMVZWTWtsSGN6bFJnZ0VZVlVOc1l6VktjalZIZVVadlVTMW9hemh5TURWMlNEbG5nZ0VZVlVOSVdHdFVibXR6V1haT2VXUnRSbFJtWW01eFR6Tm5nZ0VZVlVObmJYQnlYek5IYjJ0dmRUZG9ZbXROUmxNdFNHWlJnZ0VZVlVOd1NEZFRaMHBUZDFSU1ozVnZiemRDZDBvd01HRjNnZ0VZVlVOQ1VuVXhXalp0YkdObVFuSlVjVEZqY0VsTE1sQjNnZ0VZVlVOeFgweE9WMkZ3YTB4dE9FNXRTVlJRYlRoTlNYUm5nZ0VZVlVOd1VsSmpNa2xDTkUxQ1VXWXlhSEJLVmtkMlVrWkLKAWoaFWh0dHBzOi8vbS55b3V0dWJlLmNvbSIAKk9odHRwczovL20ueW91dHViZS5jb20vcmVzdWx0cz9zZWFyY2hfcXVlcnk9bGF0ZStuaWdodCt0YWxlcyZzcD1FZ0lRQWclMjUzRCUyNTNEGIHg6BgiC3NlYXJjaC1mZWVk', 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8')
   test = await usetube.searchVideo(req.query.url) // this is key word
  // test = await usetube.searchVideo('Lorn','EpUEEgRMb3JuGqgDU0JTQ0FRdERjV0ZCYzE4ellYcFRjNElCQzIxaGRWWXlUbVJEY3pZd2dnRUxkVGRqTWxaTVJ6VlVkR09DQVF0MU9XY3dWUzFOTWsxalVZSUJDM1JSTUdaeFlubFZiRXAzZ2dFTFZIcDZjbnBIZVV0dk5tZUNBUXRsVkZsSloyVTRaRWhZVVlJQkdGVkRlR1ZpYTA4MFQwcDRhak56VlZkS2FqUmtTREYxWjRJQkMyTmxZblV3U20xamJGVlJnZ0VMZEdSTFFrNVVOalF4VmppQ0FRdFZSVUpKYzFWemRtaGxRWUlCQzBseFNsQkRSRGxUYlhZNGdnRUxZVEZrTUZCV1JqTXhaVkdDQVF0WlRsQlFaR3Q0UlRkVE1JSUJDMmhHVXpKRVYyZHBhbWcwZ2dFTFUwZ3RiemRsWkdoeGMzT0NBU0pRVEdKMVNIRnNiRWh4WVVsSmJqTndNV05LZVRRMVRVUlpOakpsVEc1M2NYUXdnZ0VMVVUxUmFVMXZjMFl4UWpDQ0FRdE9WRWR3U2t0a1kwTktiNElCQzFsdldraHhlV3RTTURScsoBYQgEGhVodHRwczovL20ueW91dHViZS5jb20iACpEaHR0cHM6Ly9tLnlvdXR1YmUuY29tL3Jlc3VsdHM_dmlkZW9FbWJlZGRhYmxlPXRydWUmc2VhcmNoX3F1ZXJ5PUxvcm4YgeDoGCILc2VhcmNoLWZlZWQ%3D','AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8')
  // test = await usetube.getVideoDate('i0Q0HIpvkhU')
  // test = await usetube.getPlaylistVideos('PLhrglt2nmIGgQdb_L8Ri5bOfBr86qZZgq')  // 21 videos
    // test = await usetube.getPlaylistVideos('PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d')  // 21 videos
  // test = await usetube.getPlaylistVideos('PLiNVoBckLqLnEPv9c7QVk_ctJjaaOK-Q0')
  // test = await usetube.getPlaylistVideos('PL4dX1IHww9p1D3ZzW8J2fX6q1FP5av2No')  // 6 videos
  // test = await usetube.getVideosFromDesc('u5G6BFYYw20')  // 18 videos
  // await console.log(test)
await res.json(test)

})

//  console.log(test)
// app.post('/send',(req,res,next)=>{

//   return res.json(test)
// })
// launchTest()
// crawler('Cat videos', function (results) {
// 	console.dir(results); //Outputs an array filled with cat videos.
// });
app.get('/get', async (req, res, next) => {
		// let url = req.query;
     console.log(true)

		let url = req.query.url;
    console.log(url)
    // console.log(url)
		// if(!ytdl.validateURL(url)) {
		// 	return res.sendStatus(400);
		// }
		let title = 'video';

		// await ytdl(`http://www.youtube.com/watch?v=eotUHuimiRk`, {
		// 	format: 'mp4'
		// }).pipe(fs.createWriteStream('video.mp4')); 

		res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
await		ytdl(`http://www.youtube.com/watch?v=${url}`, {
			format: 'mp4',
		}).pipe(res);

res.status('200')
});
app.listen(PORT, () => {
	console.log(`Server Works !!! At port ${PORT}`);
});

// app.get('/downloadmp3', async (req, res, next) => {
// 	try {
// 		var url = req.query.url;
// 		if(!ytdl.validateURL(url)) {
// 			return res.sendStatus(400);
// 		}
// 		let title = 'audio';

// 		await ytdl.getBasicInfo(url, {
// 			format: 'mp4'
// 		}, (err, info) => {
// 			if (err) throw err;
// 			title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
// 		});

// 		res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
// 		ytdl(url, {
// 			format: 'mp3',
// 			filter: 'audioonly',
// 		}).pipe(res);

// 	} catch (err) {
// 		console.error(err);
// 	}
// });
