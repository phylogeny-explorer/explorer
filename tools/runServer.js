import ecosystem from '../ecosystem.config';
import pm2 from 'pm2';

function runServer(cb)
{
  pm2.connect(function(err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }

    pm2.start(ecosystem, function(err, proc) {
      cb(err, 'localhost:3000');
      console.log(proc);
      pm2.disconnect();   // Disconnects from PM2
      if (err) console.log(err);
    });
  });
}

export default runServer;








//
//
// // Should match the text string used in `src/server.js/server.listen(...)`
// const RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//;
//
// let server;
// const { output } = webpackConfig.find(x => x.target === 'node');
// const serverPath = path.join(output.path, output.filename);
//
// // Launch or restart the Node.js server
// function runServer(cb) {
//   let cbIsPending = !!cb;
//
//   function onStdOut(data) {
//     const time = new Date().toTimeString();
//     const match = data.toString('utf8').match(RUNNING_REGEXP);
//
//     process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
//     process.stdout.write(data);
//
//     if (match) {
//       server.stdout.removeListener('data', onStdOut);
//       server.stdout.on('data', x => process.stdout.write(x));
//       if (cb) {
//         cbIsPending = false;
//         cb(null, match[1]);
//       }
//     }
//   }
//
//   if (server) {
//     server.kill('SIGTERM');
//   }
//
//   server = cp.spawn('node', [serverPath], {
//     env: Object.assign({ NODE_ENV: 'development' }, process.env),
//     silent: false,
//   });
//
//   if (cbIsPending) {
//     server.once('exit', (code, signal) => {
//       if (cbIsPending) {
//         throw new Error(`Server terminated unexpectedly with code: ${code} signal: ${signal}`);
//       }
//     });
//   }
//
//   server.stdout.on('data', onStdOut);
//   server.stderr.on('data', x => process.stderr.write(x));
//   return server;
// }
//
// process.on('exit', () => {
//   if (server) {
//     server.kill('SIGTERM');
//   }
// });
//
// export default runServer;
