const Discord = require('discord.js');
const client = new Discord.Client();

const radio = require('./radio.json');

client.on('ready', () => {
  console.log('I am ready!');
});

client.on("disconnected", function () {
    console.log("Disconnected from Discord");
    process.exit(1);
});

client.on('message', msg => {
  var cmd = '...'
  var cmds  = msg.content.split(' ')[0].substring(3).toLowerCase();
  
  console.log(cmds);
	
	switch(cmds){
		case 'rest':
			process.exit();
		break
		
		case 'join':
			return new Promise((resolve, reject) => {
				const voiceChannel = msg.member.voiceChannel;
				if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...');
				voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
			});
	
		break;
		
		case 'list':
			msg.reply(msg.channel, "__**Radio yang tersedia :**__", function () { // message.author
                for(var fxes in radio) {
                    var info = "**" + fxes + 	"**";
                    var usage = radio[fxes].usage;
                    
                    msg.reply(msg.channel, info); // message.author
                }
            });
		break;
		
		case 'prambors':
		voiceChannel = msg.member.voiceChannel;
		sOpt = { seek: 0, volume: 2 };
		var name = "prambors";
		var url = 'http://masima.rastream.com/masima-pramborsjakarta?awparams=companionads%3Afalse%3Btags%3Aradioactive%3Bstationid%3Amasima-pramborsjakarta&playerid=Prambors_web&authtoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiJsYXlsaW8iLCJpYXQiOjE1MDQ0OTAxMDksImV4cCI6MTUwNDU3NjUwOX0.4g5vvBeEaUEzqPot0LHkzbpPdolWKdKH6HQM4owTHeM&lan=%5B%22en%22%5D&setLanguage=true';
		voiceChannel.join()
		  .then(connection => {
			const dispatcher = connection.playFile(url, sOpt);
		  })
		  .catch(console.error);
		
		
		break;
		
		case 'sample':
		voiceChannel = msg.member.voiceChannel;
		sOpt = { seek: 0, volume: 2 };
		var url = 'C:\steambot\prambors-bot\sample.mp3';
		voiceChannel.join()
		  .then(connection => {
			const dispatcher = connection.playFile(url, sOpt);
		  })
		  .catch(console.error);
		
		
		break;
		
		case 'hush':
			msg.reply('Dadah :wave:').then(msg => msg.delete(5000));
			voiceChannel.leave();
		break;
	
		default:
	}
});

client.login('NzczNDA2MjIyMTE5OTkzMzU0.X6IwrA.TzRcyx_SPtf3NKcog5FgRaQ9Sk8');