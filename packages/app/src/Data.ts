// export const getComputerModel = async (computerModelId) => {
//     fetch('api/v1/')
// }

import { PersonType } from "arpanet-map";

export const getComputerModel = async (computerModelId: number) => {
  return await fetch("api/v1/computerModels.json")
    .then((response) => response.json())
    .then((body) =>
      body.entities.map((computerModel: any) => ({
        computerModelId: computerModel.id,
        name: computerModel.name,
      }))
    )
    .then((computerModels) =>
      computerModels.find(
        (computerModel: any) =>
          computerModel.computerModelId === computerModelId
      )
    );
};

export const getPerson = async (personId: number) => {
  return await fetch("api/v1/people.json")
    .then((response) => response.json())
    .then((body) =>
      body.people.map(
        (person: any): PersonType => ({
          personId: person.id,
          fullName: person.full_name,
          nickname: person.nickname,
          wikidataId: person.wikidata_id,
        })
      )
    )
    .then((people) =>
      people.find((person: PersonType) => person.personId === personId)
    );
};
