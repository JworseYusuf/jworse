const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = (client, message) => {
  {

    let kategoriEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username ,message.author.displayAvatarURL)
      .setTitle("__MÜZİK__")
      .setThumbnail(client.user.displayAvatarURL)
      .setColor("#4286f4")
      .setDescription(
        "❯ **k!çal** - ismini yazdığınız şarkıyı çalar. \n"
        +                        
        "❯ **k!kapat** - şarkıyı kapatır. \n"     
        +                        
        "❯ **k!geç** - bir sonraki şarkıya geçersiniz. \n" 
        +        
        "❯ **k!durdur** - şarkıyı durdurur. \n"
        +
        "❯ **k!devam** - duran şarkıyı devam ettirir. \n"
        +
        "❯ **k!ses** - şarkının ses seviyesini ayarlarsınız 1-10.\n"
        )
      .addField(" Bağlantılar", "[Bot Destek Sunucusu](hhttps://discord.gg/D6J2wAB) | [Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=502869950088871948&scope=bot&permissions=393460799)")
    message.channel.send(kategoriEmbed)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 0
};

exports.help = {
  name: 'müzik',
  description: 'Tüm komutları gösterir.',
  usage: 'müzik'
};