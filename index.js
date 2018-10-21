const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const Jimp = require('jimp');
const db = require('quick.db');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  Hoşgeldin :smile:');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === '469094615761420299') permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});



client.on('message', async message => {
    if (message.content.toLowerCase() === prefix + 'döviz') {
var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error); 
    else if (!error) { 
        var euro = JSON.parse(body);
      message.channel.send(new Discord.RichEmbed().setDescription(`Dolar satış: ${info.selling} \nDolar alış: ${info.buying} \n\nEuro satış: ${euro.selling}TL \nEuro alış: ${euro.buying}TL`).setColor('RANDOM').setTitle('Anlık Döviz Kurları'))    }
})
    }
})
    }
});

var jimp = require('jimp');

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "wasted") {
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${client.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
    }
});



client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "sniper") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(310, 325)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2FPNGPIX-COM-Crosshair-PNG-Transparent-Image.png?1529363625811", (err, avatar) => {
                avatar.resize(310, 325)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});



client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.find('name', 'gelen-giden');
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.find('name', 'gelen-giden');
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {            
                        const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(ayarlar.prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'topla') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'çıkar') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'çarp') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'böl') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);
    message.channel.sendMessage(`${total}`);
  }
});

client.on("message", msg => {
        const kufur = ["oç", "OÇ", "amk", "ananı sikiyim", "ananıskm", "piç", "PİÇ", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "OROSPU", "mal", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('Küfür etmemelisin! :warning:').then(msg => msg.delete(3000));
             }              
          } catch(err) {
            console.log(err);
          }
        }
    });

client.on("message", msg => {
   const link = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party"];
        if (link.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('Reklam yapmamalısın! :warning:').then(msg => msg.delete(3000));
             }              
          } catch(err) {
            console.log(err);
          }
        }
    });

client.on("guildMemberAdd", async member => {
    let sayac = await db.fetch(`sayac_${member.guild.id}`);
    let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find('name', skanal9)
    skanal31.send(`**${member.user.tag}** Katıldı ${sayac} olmamıza son ${sayac - member.guild.members.size} üye kaldı!`)
});

client.on("guildMemberRemove", async member => {
    let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find('name', skanal9)
    skanal31.send(`**${member.user.tag}** Ayrıldı ${sayac} olmamıza son ${sayac - member.guild.members.size} üye kaldı!`)
});

const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core')
const queue = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Bot artık hazır!'));

client.on('disconnect', () => console.log('Bağlantım kesildi, bildiğinizden emin olun, şimdi tekrar bağlanacağım...'));

client.on('reconnecting', () => console.log('Tekrar bağlanıyorum!'));



client.on('message', async msg => { // eslint-disable-line
  let prefix = ayarlar.prefix;
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

  
  
	if (command === 'çal') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('🚫 | Şuanda olduğunuz kanala girmek için gerekli izinlere sahip değilim.'));
		}
		if (!permissions.has('SPEAK')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('🚫 | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // ehehehehu videomuzu bulalım
				await handleVideo(video2, msg, voiceChannel, true); // ve gönderelim
			}
      return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setDescription(`✔ | Playlist ➢ **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.sendEmbed(new Discord.RichEmbed()
                                .setTitle('Şarkı Seçimi')
      .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
       .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 30 saniye içinde liste iptal edilecektir.')
          .setColor('RANDOM'));
					// en fazla 5 tane 
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
            return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription('❎ | Şarkı seçimi iptal edildi. '));
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
          return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('RANDOM')
          .setDescription(' ❎ | Herhangi bir arama sonucu elde edemedim.'));
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'geç') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
		if (!serverQueue) return msg.channel.send(' ❎ | Kuyruk boş olduğu için geçemiyorum. ');
		serverQueue.connection.dispatcher.end('Geç komudu kullanıldı.');
		return undefined;
	} else if (command === 'kapat') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Kapat komutu kullanıldı!');
		return undefined;
	} else if (command === 'ses') {
      if (!msg.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
        .setDescription(`You can not use commands here.`)
        return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
  .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
   .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
    if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(` 🔊 | Ses seviyesi: **${serverQueue.volume}**`));
		serverQueue.volume = args[1];
        if (args[1] > 10) return msg.channel.send({
            embed: {
                title: "",
                color: 0xE50000,
                description: "Lütfen 10'dan az yada 10 olarak bir sayı belirtin."
            }
        });
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
   .setDescription('Ses Seviyesi ' + `**${args[1]}**` + ' Olarak Ayarlandı.'));
	} else if (command === 'çalınan') {
    
    
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`❕ | Şu anda hiçbir şey çalmıyorum.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(':x: | Şu anda hiçbir şey çalmıyorum.'));
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'kuyruk') {
		if (!serverQueue) return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum. ');
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'durdur') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setDescription('⏸ | Müzik durduruldu.')
      .setColor('RANDOM'));
		}
		return msg.channel.send('🚫 | Şu anda hiçbir şey çalmıyorum.');
	} else if (command === 'devam') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`Burada komutu kullanamazsınız.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('▶ | Müzik devam ediyor.'));
		}
		return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum.');
  }

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: video.title, 
		url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
		durations: video.duration.seconds,
    views: video.views,
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 3,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`HATA | Ses kanalına katılamadım: ${error}`);
		}
	}
  else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
    else return msg.channel.sendEmbed(new Discord.RichEmbed()
  .setDescription(`✔ | **${song.title}** adlı şarkı başarıyla kuyruğa eklendi.`)
  .setColor('RANDOM'));
	}

	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Akış yeterince hızlı diğil.') console.log('Şarkı Durduruldu.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

   serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()
  .setAuthor(`Şarkı Çalınıyor`, `https://images.vexels.com/media/users/3/137425/isolated/preview/f2ea1ded4d037633f687ee389a571086-youtube-icon-logo-by-vexels.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('Başlık', `[${song.title}](${song.url})`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .addField("Ses Seviyesi", `${serverQueue.volume}%`, true)
  .setColor('#FFFFFF'));
}  

client.on("guildMemberAdd", member => {

  if (db.has(`otoR_${member.guild.id}`) === false) return;
  var rol = member.guild.roles.get(db.fetch(`otoR_${member.guild.id}`));
  if (!rol) return;
  
  member.addRole(rol)
  
})


client.login(ayarlar.token);