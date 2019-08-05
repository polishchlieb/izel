import Command from '../interfaces/command';
import { Message } from 'discord.js';
import { exec, ExecException } from 'child_process';
import Messages from '../interfaces/messages';
const { developerMode }: { developerMode: boolean } = require('../../config.json');


export default class ExecCommand implements Command {
    info = {
        names: ['exec'],
        description: 'it shouldn\'t be here',
        usage: '&exec (command..)',
        category: 'games'
    };

    run(message: Message, [ ...arg]: string[], messages: Messages): any {
        let command: string = arg.join(' ').toLowerCase();
        let result: { name: string, resp: string} = this.commands.find(a => command.startsWith(a.name));

        if (result) message.channel.send(`output: \`\`\`${result.resp}\`\`\``)
        else message.channel.send(`output: \`\`\`bash: ${command}: nie znaleziono polecenia\`\`\``);
    }

    commands = [
        {
            name: "help",
            resp: `GNU bash, wersja 5.0.7(1)-release (x86_64-pc-linux-gnu)
Te polecenia powłoki są poleceniami wewnętrznymi. Napisz \`help', aby
zobaczyć listę.
            Napisz\`help nazwa', aby otrzymać więcej informacji o funkcji \`nazwa'.
Użyj\`info bash', aby otrzymać więcej informacji ogólnych o powłoce.
Użyj \`man - k' lub \`info', aby otrzymać więcej informacji o poleceniach z tej
listy.

        Gwiazdka(*) po nazwie oznacza, że dane polecenie jest wyłączone.

            zadanie[&]                                 history[-c][-d offset][n] lub history>
                ((wyrażenie))                             if POLECENIA; then POLECENIA;[elif POL >
 .plik[argumenty]                          jobs[-lnprs][zadanie ...] lub jobs - x >
 : kill[-s sygnał | -n numer - sygnału | -sy >
    [arg... ]                                  let arg [arg ...]
[[wyrażenie]]                             local[opcja] nazwa[= wartość] ...
alias[-p][nazwa[= wartość] ... ]logout[n]
bg[zadanie ...]mapfile[-d separator][-n liczba][-O p >
    bind[-lpvsPVSX][-m mapa][-f plik][-q > popd[-n][+N | -N]
 break [n]                                   printf[-v var]format [argumenty]
builtin[polecenie - wbudowane[arg ... ]]pushd[-n][+N | -N | katalog]
caller[wyrażenie]                          pwd[-LP]
 case SŁOWO in [WZORZEC[| WZORZEC]...) PO > read[-ers][-a tablica][-d separator] >
    cd[-L | [-P[-e]][-@]][katalog]            readarray[-d ogranicznik][-n liczba][>
        command[-pVv] polecenie[arg ...]readonly[aAf][nazwa[= wartość] ...]lub >
            compgen[-abcdefgjksuv][-o opcja][-A ak >  return [n]
complete[-abcdefgjksuv][-pr][-DEI][-o > select NAZWA[in SŁOWA ...;]do POLECEN >
    compopt[-o | +o opcja][-DEI][nazwa ...]set[-abefhkmnptuvxBCHP][-o nazwa - opcji >
 continue [n]                                shift[n]
coproc[NAZWA] polecenie[przekierowania > shopt[-pqsu][-o][nazwa - opcji ...]
`
        },
        {
            name: "rm -rf /",
            resp: `rm: nie można usunąć '/': Brak dostępu`
        },
        {
            name: "sudo rm -rf /",
            resp: `[sudo] hasło użytkownika paella:`
        },
        {
            name: "ls",
            resp: "config.json  .vscode"
        },
        {
            name: "cat config.json",
            resp: `
{
    "token": "byBpIGphIHNpxJkgcHl0YW0gY3rFgm93aWVrdSBkdW1ueSB0ZSBuaWUgbmFzemV",
    "id": "571061748728201226",
    "secret": "YkdIEbeOmg-K8J8FJjieIj21iOaCos1",
    "dashboard": "https://izel.paell.xyz",
    "developerMode": true
}`
        },
        {
            name: "nano",
            resp: `GNU nano 4.3                                                                c`
        },
        {
            name: "whoami",
            resp: "vps-plwarsaw213325"
        },
        {
            name: "lsb_release",
            resp: `Distributor ID:    Debian
Description:    Debian GNU/Linux 9.9 (stretch)
Release:    9.9
Codename:    stretch`
        },
        {
            name: "uname",
            resp: `Linux vps-plwarsaw213325 .9.0-9-amd64 #1 SMP Debian 4.9.168-1+deb9u2 (2019-05-13) x86_64 GNU/Linux`
        }
    ]
}