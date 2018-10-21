const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = (client, message) => {
  {

    let kategoriEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username ,message.author.displayAvatarURL)
      .setTitle("__YETKİLİ__")
      .setThumbnail(client.user.displayAvatarURL)
      .setColor("#4286f4")
      .setDescription(
        "❯ **j!kick** = İstediğiniz kişiyi sunucudan atar.\n"
        +                        
        "❯ **j!ban** = İstediğiniz kişiyi sunucudan banlar.\n"
        +                        
        "❯ **j!unban** = İstediğiniz kişinin banını açar. \n"        
        +
        "❯ **j!temizle** =  Belirttiğiniz kadar mesaj siler. \n"
        +
        "❯ **j!duyuru** = Güzel bir duyuru görünümü sağlar. \n"
        +
        "❯ **j!oylama** = Oylama Açar \n"        
        +     
        "❯ **j!sustur** = @Kişi sustur. \n"
        +
        "❯ **j!kilit** = Yazı kanalını istediğiniz süre boyunca dondurur. \n"
        +
        "❯ **j!duyuru** = Güzel bir duyuru görünümü sağlar. \n"
        +
        "❯ **j!uyar** = Belirtiğiniz kişiyi Uyarır \n"
        +
        "❯ **j!geçici-sustur** = @Kişi istediğiniz süre boyunca susturur. \n"
        +
        "❯ **j!yazı-kanal-aç** = Yazı Kanalı Açmana Yardımcı Olur. \n"
        +
        "❯ **j!ses-kanal-aç** = Ses Kanalı Açmana Yardımcı Olur. \n"
        +
        "❯ **j!oto-rol-ayarla** = Discord Sunucunuza Gelen Kişilere Belirttiğiniz Rol Verir. \n"
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
  name: 'yetkili',
  description: 'Tüm komutları gösterir.',
  usage: 'yetkili'
};
