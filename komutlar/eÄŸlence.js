const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = (client, message) => {
  {

    let kategoriEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username ,message.author.displayAvatarURL)
      .setTitle("__Eğlence Komutlar__")
      .setThumbnail(client.user.displayAvatarURL)
      .setColor("#4286f4")
      .setDescription(
        "❯ **k!herkesebendençay** = Herkese Çay Alırsınız.\n"
        +                        
        "❯ **k!koş** = Koşarsınız.\n"
        +                        
        "❯ **k!çayiç** = Çay İçersiniz. \n"        
        +
        "❯ **k!çekiç** = İstediğiniz Kişiye Çekiç Atarsınız. \n"
        +
        "❯ **k!çayaşekerat** = Çaya Şeker Atarsınız. \n"
        +
        "❯ **k!yumruh-at** = Yumruk Atarsınız. \n"
        +
        "❯ **k!banned** = Banned Resmi. \n"
        +
        "❯ **k!sarıl** = İstediğiniz Kişiye Sarılır. \n"
        +
        "❯ **k!öp** = İstediğin Kişiyi Öper. \n"
        +
        "❯ **k!balıktut** = Balık Tutarsınız. \n"
        +
        "❯ **k!tokat** = İstediğin Kişiye Tokat Atar. \n"
        +
        "❯ **k!yumruh-at** = Yumruk Atmanı Sağlar. \n"
        +
        "❯ **k!yazı-tura** = Yazı Tura Oynarsınız. \n"
        +
        "❯ **k!wasted** = Profiline Wasted Efekti Ekler. \n"
        +
        "❯ **k!sniper** = Profiline Sniper Efekti Ekler. \n"
        +
        "❯ **k!steam-oyun** = ÖRN: j!steam-oyun pubg . \n"
        +
        "❯ **k!aşk-ölçer** = Birisiylen Sevgi Değerini Ölçersiniz . \n"
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
  name: 'eğlence',
  description: 'Tüm komutları gösterir.',
  usage: 'eğlence'
};
// b!herkesebendençay = Herkese Çay Alırsınız.\n
//b!koş = Koşarsınız.\n
//b!çayiç = Çay İçersiniz. \nb!çekiç = İstediğiniz Kişiye Çekiç Atarsınız. \nb!çayaşekerat = Çaya Şeker Atarsınız. \nb!yumruh-at = Yumruk Atarsınız. \nb!yaz = Bota İstediğiniz Şeyi Yazdırırsınız. \nb!sunucuresmi = BOT Sunucunun Resmini Atar. \nb!sunucubilgi = BOT Sunucu Hakkında Bilgi Verir. \nb!kullanıcıbilgim = Sizin Hakkınızda Bilgi Verir. `) .addField("**Yetkilisi Komutlar**", `b!ban = İstediğiniz Kişiyi Sunucudan Banlar. \nb!kick = İstediğiniz Kişiyi Sunucudan Atar. \nb!unban = İstediğiniz Kişinin Yasağını Açar. \nb!sustur = İstediğiniz Kişiyi Susturur. \nb!oylama = Oylama Açar. \nb!dmduyuru = Özelden Duyuru Yapmanı Sağlar. \nb!duyuru = Güzel Bir Duyuru Görünümü Sağlar.`) .addField("**Ana Komutlar**", "b!yardım = BOT Komutlarını Atar. \nb!bilgi = BOT Kendisi Hakkında Bilgi Verir. \nb!ping = BOT Gecikme Süresini Söyler. \nb!davet = BOT Davet Linkini Atar. \nb!istatistik = BOT İstatistiklerini Atar.") .addField("**Yapımcı**", " **! HAYLAZDEATH#4532** ") .setFooter('**--------------------------**') if (!params[0]) { const commandNames = Array.from(client.commands.keys()); const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0); message.channel.send(embedyardim); } else { let command = params[0]; if (client.commands.has(command)) { command = client.commands.get(command); message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`); } } }; exports.conf = { enabled: true, guildOnly: false, aliases: ['h', 'halp', 'help', 'y'], permLevel: 0 }; exports.help = { name: 'yardım', description: 'Tüm komutları gösterir.', usage: 'yardım [komut]' };