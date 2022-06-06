# eBoekhouden-Node

A JavaScript module for interacting with the eBoekhouden API.

## Installation

#### NPM
Use the package manager npm to install eBoekhouden-Node

```bash
npm install eboekhouden --save
```

## Usage
```javascript
const eBoekhouden = require('eboekhouden'),
      eboekhouden = new eBoekhouden(username, secret1, secret2);
```

## Examples
- [Add Mutatie](#addmut)
- [Add Factuur](#addfac)
- [Add Grootboekrekening](#addgro)
- [Add Relatie](#addrel)
- [Get Mutaties](#getmut)
- [Get Administraties](#getadm)
- [Get Artikelen](#getart)
- [Get Facturen](#getfac)
- [Get Grootboekrekeningen](#getgro)
- [Get Kosten Plaatsen](#getkos)
- [Get Relaties](#getrel)
- [Get Saldi](#getsaldi)
- [Get Saldo](#getsaldo)
- [Update Grootboekrekening](#updgro)
- [Update Relatie](#updrel)

#### <a id="addmut"></a>Add Mutatie
<b>Options:</b><br>
<ul>
  <li>MutatieNr (optional)</li>
  <li><b>Soort (required)</b></li>
  <li><b>Datum (required)</b></li>
  <li><b>Rekening (required)</b></li>
  <li><b>Relatiecode (required)</b></li>
  <li><b>Factuurnummer (required)</b></li>
  <li>Boekstuk (optional)</li>
  <li><b>Omschrijving (required)</b></li>
  <li><b>Betalingstermijn (required)</b></li>
  <li>Betalingskenmerk (optional)</li>
  <li>InExBTW (optional)</li>
  <li><b>MutatieRegels (required)</b></li>
  <li><b>BedragInvoer (required)</b></li>
  <li><b>BedragExclBTW (required)</b></li>
  <li><b>BedragBTW (required)</b></li>
  <li><b>BedragInclBTW (required)</b></li>
  <li><b>BTWCode (required)</b></li>
  <li><b>BTWPercentage (required)</b></li>
  <li><b>TegenrekeningCode (required)</b></li>
  <li><b>KostenplaatsID (required)</b></li>
</ul>

```javascript
await eboekhouden.AddMutatie(options, tries);
```
#### <a id=addfac></a>Add Factuur
<b>Options:</b><br>
<ul>
  <li>Factuurnummer (optional)</li>
  <li><b>Relatiecode (required)</b></li>
  <li><b>Datum (required)</b></li>
  <li>Betalingstermijn (optional)</li>
  <li><b>Factuursjabloon (required)</b></li>
  <li>PerEmailVerzenden (optional)</li>
  <li>EmailOnderwerp (optional)</li>
  <li>EmailBericht (optional)</li>
  <li>EmailVanAdres (optional)</li>
  <li>EmailVanNaam (optional)</li>
  <li>AutomatischeIncasso (optional)</li>
  <li>IncassoIBAN (optional)</li>
  <li>IncassoMachtigingSoort (optional)</li>
  <li>IncassoMachtigingID (optional)</li>
  <li>IncassoMachtigingDatumOndertekening (optional)</li>
  <li>IncassoMachtigingFirst (optional)</li>
  <li>IncassoRekeningNummer (optional)</li>
  <li>IncassoTnv (optional)</li>
  <li>IncassoPlaats (optional)</li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>

```javascript
await eboekhouden.AddFactuur(options, tries);
```
#### <a id=addgro></a>Add Grootboekrekening
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.AddGrootboekrekening(options, tries);
```
#### <a id=addrel></a>Add Relatie
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.AddRelatie(options, tries);
```
#### <a id=getmut></a>Get Mutaties
<b>Options:</b><br>
<ul>
  <li>MutatieNr (optional)</li>
  <li>MutatieNrVan (optional)</li>
  <li>MutatieNrTm (optional)</li>
  <li>Factuurnummer (optional)</li>
  <li>DatumVan: (optional)</li>
  <li>DatumTm (optional)</li>
</ul>

```javascript
let options = {
  DatumVan: new Date(new Date().getTime() - 6e4 * 60 * 24 * 2),
  DatumTm: new Date()
};
let tries = 3;
let mutations = await eboekhouden.GetMutaties(options, tries);
```
#### <a id=getadm></a>Get Administraties
<b>Options:</b><br>
<ul>
  <li></li>
</ul>
```javascript
await eboekhouden.GetAdministraties(options, tries);
```
#### <a id=getart></a>Get Artikelen
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.GetArtikelen(options, tries);
```
#### <a id=getfac></a>Get Facturen
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.GetFacturen(options, tries);
```
#### <a id=getgro></a>Get Grootboekrekeningen
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.GetGrootboekrekeningen(options, tries);
```
#### <a id=getkos></a>Get Kosten Kostenplaatsen
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.GetKostenplaatsen(options, tries);
```
#### <a id=getrel></a>Get Relaties
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.GetRelaties(options, tries);
```
#### <a id=getsaldi></a>Get Saldi
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.GetSaldi(options, tries);
```
#### <a id=getsaldo></a>Get Saldo
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.GetSaldo(options, tries);
```
#### <a id=updgro></a>Update Grootboekrekeningen
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.UpdateGrootboekrekening(options, tries);
```
#### <a id=updrel></a>Update Relatie
<b>Options:</b><br>
<ul>
  <li></li>
</ul>

```javascript
await eboekhouden.UpdateRelatie(options, tries);
```
