const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const fs = require("fs");
const data = require("./eleve2.json");

let app = express();

let schema = buildSchema(`
	type Eleve {
		id: Int
		lastname: String
		firstname: String
		classe: Classe
	}

	type Classe {
		id: Int
		name: String
		groupe: Int
		promo: String
		eleves: [Eleve]
	}

	type Query {
		eleves: [Eleve]
		classes: [Classe]
	}

	type Mutation {
		addEleve(lastname: String!, firstname: String!, classe: Int!): Eleve
		updateEleve(id: Int!, lastname: String, firstname: String, classe: Int): Eleve
		deleteEleve(id: Int!): Eleve

		addClasse(name: String!, groupe: Int!, promo: String!): Classe
		updateClasse(id: Int!, name: String, groupe: Int, promo: String): Classe
		deleteClasse(id: Int!): Classe
	}
`);

let root = {
  eleves: () => {
	let out = []
	data.eleves.forEach(eleve => {
		let classe = data.classes.find(classe => classe.id === eleve.classe);
		out.push({
			id: eleve.id,
			lastname: eleve.lastname,
			firstname: eleve.firstname,
			classe: classe
		});
	});
    return out;
  },
  addEleve: ({ lastname, firstname, classe }) => {
    let maxId = 0;
    data.eleves.forEach((eleve) => {
      if (eleve.id > maxId) {
        maxId = eleve.id;
      }
    });
    maxId++;

    let eleve = {
      id: maxId,
      lastname,
      firstname,
      classe,
    };
    data.eleves.push(eleve);
    return eleve;
  },
  updateEleve: ({ id, lastname, firstname, classe }) => {
    let eleve = {
      id,
      lastname,
      firstname,
      classe,
    };
    let index = data.eleves.findIndex((eleve) => eleve.id === id);
    data.eleves[index] = eleve;
    return eleve;
  },
  deleteEleve: ({ id }) => {
    let index = data.eleves.findIndex((eleve) => eleve.id === id);
    let eleve = data.eleves[index];
    data.eleves.splice(index, 1);
    return eleve;
  },

  classes: () => {
	let out = []
	data.classes.forEach(classe => {
		let eleves = data.eleves.filter(eleve => eleve.classe === classe.id);
		out.push({
			id: classe.id,
			name: classe.name,
			groupe: classe.groupe,
			promo: classe.promo,
			eleves: eleves
		});
	});
	return out;
  },
  addClasse: ({ name, groupe, promo }) => {
    let maxId = 0;
    data.classes.forEach((classe) => {
      if (classe.id > maxId) {
        maxId = classe.id;
      }
    });
    maxId++;

    let classe = {
      id: maxId,
      name,
      groupe,
      promo,
    };
    data.classes.push(classe);
    return classe;
  },
  updateClasse: ({ id, name, groupe, promo }) => {
    let classe = {
      id,
      name,
      groupe,
      promo,
    };
    let index = data.classes.findIndex((classe) => classe.id === id);
    data.classes[index] = classe;
    return classe;
  },
  deleteClasse: ({ id }) => {
    let index = data.classes.findIndex((classe) => classe.id === id);
    let classe = data.classes[index];
    data.classes.splice(index, 1);
    return classe;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
