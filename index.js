const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const apiEndpoint = 'https://net.uptrical.xyz/api/roblox/servers/7069857142/0';
const channelId = '1198928702159999037';
const updateInterval = 2 * 60 * 1000; 


client.once('ready', () => {
  console.log(`Bot ${client.user.tag} aktif!`);

  updateServerInfo();

  setInterval(updateServerInfo, updateInterval);
});

async function updateServerInfo() {
  const response = await fetch(apiEndpoint);
  const data = await response.json();

  const firstData = data[0];

  const channel = await client.channels.fetch(channelId);

  const messages = await channel.messages.fetch({ limit: 1 });
  const existingMessage = messages.first();

  const embedContent = {
    content: '**Roblox { [ 🎄 TÜRK] Sohbet Oyunu } info with api**',
    embeds: [{
      description: '```\n' +
        ` Aktif Oyuncu sayısı: ${firstData.playing}\n` +
        ` En fazla oyuncu sayısı: ${firstData.maxPlayers}\n` +
        ` Gelen ping değeri: ${firstData.ping}\n` +
        '```',
        image: {
            url: 'https://i.hizliresim.com/lszqwo2.png', // Resmin URL'sini buraya ekleyin
          },
    }],
  };

  if (existingMessage) {
    existingMessage.edit(embedContent);
  } else {
    channel.send(embedContent);
  }
}
// Botu çalıştırma
client.login('MTE5ODY3NjQ1Nzc2MTgwMDIwMg.G4s-vu.5mmjTpqdW5NwQbQPqSlIGVPML_Tz3pIWvJDGDM');
