const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let role = message.mentions.roles.first()
  
    if (!role) {
        return message.reply("Bir rolü etiketlemelisin!")
    }
  
     db.set(`otoR_${message.guild.id}`, role.id)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`İşlem Başarılı: **${role.name}**`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['oto-rol', 'oto-rol-belirle'],
    permLevel: 3
}

exports.help = {
    name: 'oto-rol-ayarla',
    description: 'Sunucuya birisi katıldıgında verilecek rolü ayarlar.',
    usage: 'oto-rol-ayarla <@rol>'
}