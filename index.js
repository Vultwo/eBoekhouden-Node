const soap = require('strong-soap').soap;
class EBoekhouden {
  constructor(username, code_1, code_2) {
    this.username = username;
    this.code_1 = code_1;
    this.code_2 = code_2;
    this.url = 'https://soap.e-boekhouden.nl/soap.asmx?wsdl';
    this.options = {envelopeKey: 'soap', wsdl_options: {xmlKey: '$xml', overrideRootElement: {namespace: 'xmlns:soap'}}};
    this.client;
    this.sessionID;
    this.BTW_Codes = [
      'HOOG_VERK', 'HOOG_VERK_21', 'LAAG_VERK', 'LAAG_VERK_9',
      'LAAG_VERK_L9', 'VERL_VERK', 'AFW', 'BU_EU_VERK',
      'BI_EU_VERK_D', 'AFST_VERK', 'LAAG_INK', 'LAAG_INK_9',
      'VERL_INK_LG', 'HOOG_INK', 'HOOG_INK_21', 'VERL_INK',
      'AFW_VERK', 'BU_EU_INK', 'BI_EU_INK', 'GEEN'
    ];
    this.GetMutaties = this.GetMutaties;
    this.AddMutatie = this.AddMutatie;
    this.AddFactuur = this.AddFactuur;
    this.AddGrootboekrekening = this.AddGrootboekrekening;
    this.AddRelatie = this.AddRelatie;
    this.GetAdministraties = this.GetAdministraties;
    this.GetArtikelen = this.GetArtikelen;
    this.GetFacturen = this.GetFacturen;
    this.GetGrootboekrekeningen = this.GetGrootboekrekeningen;
    this.GetKostenplaatsen = this.GetKostenplaatsen;
    this.GetOpenPosten = this.GetOpenPosten;
    this.GetRelaties = this.GetRelaties;
    this.GetSaldi = this.GetSaldi;
    this.GetSaldo = this.GetSaldo;
    this.UpdateGrootboekrekening = this.UpdateGrootboekrekening;
    this.UpdateRelatie = this.UpdateRelatie;
    this._init();
    process.on('exit', async() => await this.CloseSession());
  }
  async _init() {
    await this.CreateClient(3);
    await this.OpenSession(3);
  }
  async CreateClient(tries=2) {
    return new Promise(async(resolve, reject) => {
      soap.createClient(this.url, this.options, async(err, client) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 3) return reject(err);
          return setTimeout(resolve(CreateClient(tries)), 2e3);
        }
        this.client = client;
        return resolve();
      });
    });
  }
  async GetMutaties(options={}, tries=2) {
    /*
        options
      DatumVan: Date
      DatumTm: Date
    */
    return new Promise(async(resolve, reject) => {
      if(!options.cFilter) options.cFilter = {};
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['GetMutaties'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(GetMutaties(options, tries)), 2e3);
        }
        return resolve(result.GetMutatiesResult.Mutaties.cMutatieList);
      });
    });
  }
  async AddMutatie(options, tries=2) {
    /*
        options
    // (req) Soort : 'string' (factuur ontvangen, factuur verstuurd, factuurbetaling ontvangen, factuurbetaling verstuurd, geld ontvangen, geld uitgegeven, memoriaal)
    // (req) Datum: 'date'
    // (req) Rekening: 'string' Rekening code
    // (req) RelatieCode: 'string' Relatie code
    // (req) Factuurnummer: 'string'
    // (req) Omschrijving: 'string'
    // (req) Betalingstermijn: 'string'
    // (req) MutatieRegels: 'array'
    // (req) BedragInvoer: decimal
    // (req) BedragExclBTW: decimal,
    // (req) BedragBTW: decimal,
    // (req) BedragInclBTW: decimal,
    // (req) BTWCode: 'string'
    // (req) BTWPercentage: decimal
    // (req) TegenrekeningCode: 'string'
    */
    return new Promise(async(resolve, reject) => {
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['AddMutatie'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(AddMutatie(options, tries)), 2e3);
        }
        return resolve(result);
      });
    });
  }
  async AddFactuur(options, tries=2) {
    /*
        options
      (req) RelatieCode
      (req) Datum
      ()
    */
    return new Promise(async(resolve, reject) => {
      // TODO
      return resolve();
    });
  }
  async AddGrootboekrekening(options, tries=2) {
    /*
        options
      (opt) ID
      (req) Code
      (req) Omschrijving
      (req) Categorie
    */
    return new Promise(async(resolve, reject) => {
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['AddGrootboekrekening'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(AddGrootboekrekening(options, tries)), 2e3);
        }
        return resolve(result);
      });
    });
  }
  async AddRelatie(options, tries=2) {
    /*
        options
      (req) Code 'string'
      (req) Bedrijf 'string'
    */
    return new Promise(async(resolve, reject) => {
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['AddRelatie'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(AddRelatie(options, tries)), 2e3);
        }
        return resolve(result);
      });
    });
  }
  async GetAdministraties(tries=2) {
    return new Promise(async(resolve, reject) => {
      this.client['GetAdministraties']({SessionID: this.sessionID, SecurityCode2: this.code_2}, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(GetAdministraties(options, tries)), 2e3);
        }
        return resolve(result.GetAdministratiesResult.Administraties.cAdministratie);
      });
    });
  }
  async GetArtikelen(options={}, tries=2) {
    return new Promise(async(resolve, reject) => {
      if(!options.cFilter) options.cFilter = {};
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['GetArtikelen'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(GetArtikelen(options, tries)), 2e3);
        }
        return resolve(result.GetArtikelenResult.Artikelen);
      });
    });
  }
  async GetFacturen(options={}, tries=2) {
    return new Promise(async(resolve, reject) => {
      if(!options.cFilter) options.cFilter = {};
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['GetFacturen'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(GetFacturen(options, tries)), 2e3);
        }
        return resolve(result.GetFacturenResult.Facturen);
      });
    });
  }
  async GetGrootboekrekeningen(options={}, tries=2) {
    return new Promise(async(resolve, reject) => {
      if(!options.cFilter) options.cFilter = {};
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['GetGrootboekrekeningen'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(GetGrootboekrekeningen(options, tries)), 2e3);
        }
        return resolve(result.GetGrootboekrekeningenResult.Rekeningen.cGrootboekrekening);
      });
    });
  }
  async GetKostenplaatsen(options={}, tries=2) {
    return new Promise(async(resolve, reject) => {
      if(!options.cFilter) options.cFilter = {};
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['GetKostenplaatsen'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(GetKostenplaatsen(options, tries)), 2e3);
        }
        return resolve(result.GetKostenplaatsenResult.Kostenplaatsen);
      });
    });
  }
  async GetOpenPosten(options={}, tries=2) {
    return new Promise(async(resolve, reject) => {
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['GetOpenPosten'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(GetOpenPosten(options, tries)), 2e3);
        }
        return resolve(result.GetOpenPostenResult.Openposten);
      });
    });
  }
  async GetRelaties(options={}, tries=2) {
    return new Promise(async(resolve, reject) => {
      if(!options.cFilter) options.cFilter = {};
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['GetRelaties'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(GetRelaties(options, tries)), 2e3);
        }
        return resolve(result.GetRelatiesResult.Relaties.cRelatie);
      });
    })
  }
  async GetSaldi(options={}, tries=2) {
    return new Promise(async(resolve, reject) => {
      if(!options.cFilter) options.cFilter = {};
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['GetSaldi'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(GetSaldi(options, tries)), 2e3);
        }
        return resolve(result.GetSaldiResult.Saldi.cSaldo);
      });
    });
  }
  async GetSaldo(options={}, tries=2) {
    return new Promise(async(resolve, reject) => {
      if(!options.cFilter) options.cFilter = {};
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['GetSaldo'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(GetSaldo(options, tries)), 2e3);
        }
        return resolve(result.GetSaldoResult.Saldo);
      });
    });
  }
  async UpdateGrootboekrekening(options={}, tries=2) {
    return new Promise(async(resolve, reject) => {
      if(!options.cFilter) options.cFilter = {};
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['UpdateGrootboekrekening'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(UpdateGrootboekrekening(options, tries)), 2e3);
        }
        return resolve(result);
      });
    });
  }
  async UpdateRelatie(options={}, tries=2) {
    return new Promise(async(resolve, reject) => {
      if(!options.cFilter) options.cFilter = {};
      options.SessionID = this.sessionID;
      options.SecurityCode2 = this.code_2;
      this.client['UpdateRelatie'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(UpdateRelatie(options, tries)), 2e3);
        }
        return resolve();
      });
    });
  }
  async OpenSession(tries=2) {
    return new Promise(async(resolve, reject) => {
      let body = {
        Username: this.username,
        SecurityCode1: this.code_1,
        SecurityCode2: this.code_2,
      };
      this.client['OpenSession'](body, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(OpenSession(tries)), 2e3);
        }
        this.sessionID = result.OpenSessionResult.SessionID;
        return resolve();
      });
    });
  }
  async OpenSessionSub(tries=2) {
    return new Promise(async(resolve, reject) => {
      let options = {
        Username: this.username,
        SecurityCode1: this.code_1,
        SecurityCode2: this.code_2,
        AdministratieGuid: 'IntraNode'
      };
      this.client['OpenSessionSub'](options, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(OpenSessionSub(tries)), 2e3);
        }
        this.sessionID = result.OpenSessionSubResult.SessionID;
        return resolve();
      });
    });
  }
  async CloseSession(tries=2) {
    return new Promise(async(resolve, reject) => {
      this.client['CloseSession']({SessionID: this.sessionID}, async(err, result) => {
        if(err) {
          console.error(err);
          tries--;
          if(tries <= 0) return reject(err);
          return setTimeout(resolve(CloseSession(tries)), 2e3);
        }
        return resolve();
      });
    });
  }
}
module.exports = EBoekhouden;
