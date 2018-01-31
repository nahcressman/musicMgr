import React from 'react';

export const buildTrackName = (track) => {
	if (track) {
		return {
			track: track.name,
			artist: track.artists.map( (artist) => artist.name ).join(', ')
		}
	}
	return null;
}