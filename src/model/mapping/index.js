module.exports = {
    ville: (results) => {
        results.map(item => {
            delete item.ville_id;
            delete item.ville_nom_reel;
            delete item.ville_nom_soundex;
            delete item.ville_nom_metaphone;
            delete item.ville_commune;
            delete item.ville_code_commune;
            delete item.ville_arrondissement;
            delete item.ville_canton;
            delete item.ville_amdi;
            delete item.ville_densite_2010;
            delete item.ville_surface;
            delete item.ville_longitude_grd;
            delete item.ville_latitude_grd;
            delete item.ville_longitude_dms;
            delete item.ville_latitude_dms;
            delete item.ville_zmin;
            delete item.ville_zmax;
            return item;
        });
        return results;
    },
    user: (results) => {
        results.map(item => {
            item.id = item.iduser;
            delete item.iduser;
            delete item.datec;
            delete item.dateu;
            delete item.password;
            delete item.lastlogin;
            delete item.attempt;
            return item;
        });
        return results;
    },
    bienvendre: (results) => {
        results.map(item => {
            delete item.dateU;
            delete item.dateC;
            delete item.iduser;
            delete item.idbienvendre;
            return item;
        });
        return results;
    },
    bienvendreAll: async(results, image, j, param) => {
        results.map(item => {
            if (item.idbienvendre == image[j].idbienvendre) {
                item[param] = image.map(item => {
                    delete item.idbienvendre;
                    delete item.idimage;
                    return item;
                });
            } else if (image == [])
                item[param] = [];
            return item;
        });
        return results;
    },
    image: (results) => {
        results.map(item => {
            delete item.idbienvendre;
            delete item.idimage;
            return item;
        });
        return results;
    }
};