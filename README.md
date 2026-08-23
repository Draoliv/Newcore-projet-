# Marche Japonaise 30

Minuteur d'intervalles pour la **marche japonaise** (Interval Walking Training) :
**3 min de marche lente / 3 min de marche rapide × 5 cycles = 30 minutes.**

Application web d'un seul fichier (`index.html`), conçue **pour iPhone**.

## Fonctionnement

- Bips de pré-annonce à T-3 / T-2 / T-1 seconde avant chaque changement d'allure
- Bip long au passage : aigu vers la marche rapide, grave vers la marche lente
- Fanfare de fin à 30:00
- Son généré à pleine puissance (ondes carrées + compresseur), volume réglable
- Bips programmés d'avance dans le moteur audio : ils sonnent à l'heure même
  iPhone verrouillé dans la poche
- L'écran reste allumé pendant la séance (Wake Lock)
- Vibration au changement d'allure
- Durées et nombre de cycles ajustables

## Utilisation

Ouvrir `index.html` dans Safari, puis **Partager → Sur l'écran d'accueil**
pour l'utiliser en plein écran comme une application.

Montez le volume au maximum et sortez l'iPhone du mode silencieux
(bouton latéral) : iOS coupe le son des pages web en mode silencieux.
