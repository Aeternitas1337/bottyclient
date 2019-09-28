//PORT:
const port = 4000


const style = "<style>body {background-color: #2C2F33; color: #CCCCCC} button {background-color: #99AAB5; color: #FFF; height: 2em}</style>"
const b = ""

const express = require('express');
const app = express();

const bot = require("./bot/main.js")


app.get('/', async function(req, re) {
  var r = req.query
  if(!r.path) {
    re.sendFile(__dirname + "/viewer/index.html")
  }
  if(r.path == "run" && r.token && !r.guild) {
    await bot.login(r.token) && console.log(r.token)
    re.send(bot.selectGuild() + style)
  }
  if(r.path == "sch" && r.guild) {
    re.send(bot.selectChannel(r.guild) + style)
  }
  if(r.path == "msgs" && r.channel) {
    re.send(await bot.messages(r.channel) + style)
  }
  if(r.path == "send" && r.channel) {
    await bot.send(r.channel, r.msg)
    re.send(await bot.messages(r.channel) + style)
  }
  if(r.path == "dm" && r.dm) {
    re.send(await bot.dmmessages(r.dm) + style)
  }
  if(r.path == "senddm" && r.dm) {
    await bot.senddm(r.dm, r.msg)
    re.send(await bot.dmmessages(r.dm) + style)
  }
  if(r.path == "leave" && r.guild) {
    await bot.leave(r.guild)
    re.send(bot.selectGuild() + style)
  }
  if(r.path == "delete" && r.channel && r.guild) {
    await bot.deletech(r.channel)
    re.send(bot.selectChannel(r.guild) + style)
  }
  if(r.path == "deleter" && r.role && r.guild) {
    await bot.deleter(r.role, r.guild)
    re.send(bot.selectRole(r.guild) + style)
  }
  if(r.path == "deletem" && r.member && r.guild) {
    await bot.deletem(r.member, r.guild)
    re.send(bot.selectMember(r.guild) + style)
  }
  if(r.path == "ms" && r.guild) {
    re.send(bot.selectMember(r.guild) + style)
  }
  if(r.path == "delM" && r.channel && r.message) {
    await bot.delM(r.message, r.channel)
    re.send(await bot.messages(r.channel) + style)
  }
  if(r.path == "delMdm" && r.dm && r.message) {
    await bot.delMdm(r.message, r.dm)
    re.send(await bot.dmmessages(r.dm) + style)
  }
  if(r.path == "roles" && r.guild) {
    re.send(bot.selectRole(r.guild) + style)
  }
  if(r.path == "create" && r.name && r.type && r.guild) {
    await bot.create(r.name, {type: r.type}, r.guild)
    re.send(bot.selectChannel(r.guild) + style)
  }
  if(r.path == "crro" && r.name && r.guild) {
    await bot.createRole(r.name, r.perms, r.guild)
    re.send(bot.selectRole(r.guild) + style)
  }
  if(r.path == "list") {
    re.send(bot.selectGuild() + style)
  }
  if(r.path == "clist" && r.channel) {
    re.send(bot.selectChannel(bot.getGuild(r.channel)) + style)
  }
  if(r.logoff == "1") {
    re.sendFile(__dirname + "/viewer/index.html")
    bot.logout()
  }
});

const listener = app.listen(port, function() {
  console.log(`Go to any browser on THIS computer and open http://localhost:${port}`)
})
