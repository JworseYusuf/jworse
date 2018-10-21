const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply("Sayaç kanalı olarak ayarlamak istediğin kanalı etiketlemelisin!")
    }

    db.set(`sayacK_${message.guild.id}`, channel.name)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`Sayaç kanalı başarıyla ${channel} olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send(embed)
}
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['skanal-ayarla', 'skanal-belirle', "s-kanal-ayarla", "s-kanal-belirle"],
    permLevel: 3
}

exports.help = {
    name: 'sayaç-kanal-ayarla',
    kategori: 'ayarlar',
    description: 'Sayaç kanalını ayarlar.',
    usage: 'sayaç-kanal-ayarla <#kanal>'
}