# awakeprod.fr

Site vitrine d'AwakeProd. Statique, sans build : un `index.html`, un dossier `img/`, une fonction Cloudflare pour le formulaire de contact.

```
index.html              la page (HTML + CSS + JS, tout inline)
img/                    captures produits (WebP), favicon, image de partage
functions/api/contact.js  formulaire de contact → e-mail via Resend (Cloudflare Pages Function)
_headers                en-têtes de sécurité et cache
robots.txt, sitemap.xml
```

## 1. Pousser sur GitHub

Dans ce dossier, sur ton Mac :

```bash
git init -b main
git add .
git commit -m "AwakeProd site"
# avec GitHub CLI (brew install gh ; gh auth login) :
gh repo create awakeprod-site --private --source=. --push
# ou sans gh : crée le repo vide sur github.com puis
# git remote add origin git@github.com:<toi>/awakeprod-site.git && git push -u origin main
```

## 2. Déployer sur Cloudflare Pages

1. Dashboard Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → choisis `awakeprod-site`.
2. Réglages de build :
   - Framework preset : **None**
   - Build command : *(vide)*
   - Build output directory : `/`
3. **Save and Deploy**. Tu obtiens une URL `*.pages.dev` en une minute. Chaque `git push` sur `main` redéploie.

## 3. Brancher awakeprod.fr

Le domaine officiel (RNE) est `awakeprod.fr` et l'URL canonique du site est `https://www.awakeprod.fr/`. Projet Pages → **Custom domains** → **Set up a custom domain** → `www.awakeprod.fr`, puis `awakeprod.fr`. Cloudflare crée les enregistrements DNS tout seul.

Les deux hôtes servent la même page ; la balise `<link rel="canonical">` désigne `www.awakeprod.fr`. Pour n'exposer qu'un seul hôte, ajouter dans la zone `awakeprod.fr` une Redirect Rule 301 de `awakeprod.fr` vers `https://www.awakeprod.fr` (chemin et query conservés).

Si le domaine avait déjà un enregistrement A / CNAME vers OVH pour le site, supprime-le d'abord dans DNS, sinon Pages refusera.

## 4. Activer le formulaire de contact

Sans ça, le formulaire affiche l'erreur « Something went wrong » et renvoie vers l'e-mail. Il faut un compte [Resend](https://resend.com) (gratuit jusqu'à 3 000 e-mails/mois) :

1. Resend → **Domains** → ajoute `awakeprod.fr` et crée les enregistrements DNS qu'il indique (ils sont chez Cloudflare, 2 minutes).
2. Resend → **API Keys** → crée une clé.
3. Cloudflare → ton projet Pages → **Settings** → **Variables and Secrets** → ajoute, pour *Production* :
   - `RESEND_API_KEY` (secret) : la clé
   - `CONTACT_TO` : `julien@awakeprod.fr`
   - `CONTACT_FROM` : `site@awakeprod.fr` (n'importe quelle adresse sur le domaine vérifié)
4. Redéploie (ou pousse un commit). Teste le formulaire : le message arrive avec le `Reply-To` de l'expéditeur.

Un champ caché « website » sert de piège à robots : s'il est rempli, le message est ignoré silencieusement.

## 5. Informations légales

La section « Mentions légales » de `index.html` et le bloc JSON-LD `Organization` du `<head>` reprennent l'attestation RNE (SIRET, immatriculation, APE, siège). Mettre les deux à jour ensemble si l'un change.

## Tester en local

```bash
python3 -m http.server 8765
# puis http://localhost:8765
```

Le formulaire ne fonctionne qu'en ligne (ou avec `npx wrangler pages dev .` et les variables dans un fichier `.dev.vars`).
