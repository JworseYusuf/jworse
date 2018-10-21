const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = 'k!';

exports.run = (client, message) => {
  {
    let kategoriEmbed = new Discord.RichEmbed()
    
      .setTitle("__YARDIM__")
      .setThumbnail(message.author.displayAvatarURL)
      .setColor("#4286f4")
      .setDescription(
                      "**k!eğlence** - Eğlence ve Kulanıcı komutlarını gösterir. \n" +
                      "**k!anakomutlar** - Ana komutları Gösterir. \n" +
                      "**k!yetkili** - Yetkili komutlarını gösterir. \n" +
                      "**k!müzik** - Müzik komutlarını gösterir. \n"
                     )
      .addField(" Bağlantılar", "[Bot Destek Sunucusu](https://discord.gg/D6J2wAB) | [Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=488354119908851712&scope=bot&permissions=401976383) | ")
    message.channel.send(kategoriEmbed)  
    
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y','komutlar','k'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};