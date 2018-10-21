const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = (client, message) => {
  {

    let kategoriEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username ,message.author.displayAvatarURL)
      .setTitle("__Ana Komutlar__")
      .setThumbnail(client.user.displayAvatarURL)
      .setColor("#4286f4")
      .setDescription(
        "❯ **k!tavsiye** = Botun sahibine tavsiyede bulanabilirsiniz. \n"
        +                        
        "❯ **k!kullanıcıbilgim** = Kullanıcı Bilgini Gösterir. \n"
        +                        
        "❯ **k!döviz** = Döviz Durumunu Gösterir. \n"
        +                        
        "❯ **k!sayaç** = Sayaç Adlı Kanal Açmanız Gerekir. \n"
        +                        
        "❯ **k!topla** = ÖRN: k!topla 1 1 \n"
        +                        
        "❯ **k!çıkar** = ÖRN: k!çıkar 1 1 \n"
        +                        
        "❯ **k!çarp** = ÖRN: k!çarp 1 1 \n"
        +                        
        "❯ **k!böl**= ÖRN: k!böl 1 1 \n"
        )
      .addField(" Bağlantılar", "[Bot Destek Sunucusu](https://discord.gg/D6J2wAB) | [Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=502869950088871948&scope=bot&permissions=393460799) | ")
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
  name: 'anakomutlar',
  description: 'Tüm komutları gösterir.',
  usage: 'anakomutlar'
};