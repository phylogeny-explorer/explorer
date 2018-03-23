/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 02/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import http from 'http';

export default async (url) => new Promise((resolve, reject) =>
    http.get(url, res => resolve(res)).on('error', err => reject(err))
);
