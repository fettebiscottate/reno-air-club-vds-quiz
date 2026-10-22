# Reno Air Club, VDS QUIZ

Quiz VDS della scuola di volo Reno Air Club di Argelato. Interfaccia responsive, utilizzabile da smartphone e computer.

## Modalità

- **Simulazione esame:** 70 domande in 70 minuti, superata con al massimo 7 errori. Le risposte omesse contano come errori.
- **Esercitazione libera:** selezione di uno o più argomenti e quantità personalizzata, senza limite di tempo.
- Estrazione casuale senza ripetizioni nella singola sessione.
- Correzione finale, filtro degli errori, figure e riferimenti ai PDF di origine.
- Ripresa della sessione sullo stesso browser. Il timer dell'esame continua a scorrere anche con pagina chiusa.

Il database contiene 882 domande, 9 argomenti e 24 figure. Le risposte derivano dai correttori dei PDF forniti. I testi possono riflettere contenuti storici o refusi della fonte. La simulazione usa i parametri richiesti dal progetto e non applica quote per materia.

## Pubblicazione con GitHub Pages

Il sito è statico e non richiede build, account visitatore, backend o chiavi API.

1. Caricare il contenuto di questo progetto nel repository `fettebiscottate/reno-air-club-vds-quiz`, ramo `main`.
2. In **Settings → Pages**, scegliere **Deploy from a branch**.
3. Selezionare il ramo **main** e la cartella **/(root)**, quindi salvare.
4. Attendere il completamento della pubblicazione indicato da GitHub.

L'indirizzo previsto, dopo l'attivazione, è https://fettebiscottate.github.io/reno-air-club-vds-quiz/ .

## Sviluppo locale

È richiesto Node.js 20 o successivo. Non serve installare dipendenze.

```sh
npm start
```

Aprire http://127.0.0.1:5173 . Per i controlli sul database e sulla logica:

```sh
npm test
```

I file del sito si modificano direttamente nella cartella principale. I percorsi relativi funzionano anche nel sottopercorso di GitHub Pages.

## Dati della sessione

Le risposte vengono salvate nel localStorage del dispositivo. Non sono sincronizzate tra dispositivi e possono essere cancellate eliminando i dati del browser. Nessun servizio remoto riceve le risposte. I font possono essere caricati da Google Fonts.

Il progetto non assegna una licenza ai materiali del database provenienti da terzi.
