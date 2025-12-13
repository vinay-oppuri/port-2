interface SpotifyPlayer {
    connect(): Promise<boolean>;
    disconnect(): void;
    addListener(eventName: string, callback: (state: any) => void): boolean;
    removeListener(eventName: string, callback?: (state: any) => void): boolean;
    getCurrentState(): Promise<any>;
    setName(name: string): Promise<void>;
    getVolume(): Promise<number>;
    setVolume(volume: number): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    togglePlay(): Promise<void>;
    seek(position_ms: number): Promise<void>;
    previousTrack(): Promise<void>;
    nextTrack(): Promise<void>;
    activateElement(): Promise<void>;
}

interface SpotifyPlayerOptions {
    name: string;
    getOAuthToken: (cb: (token: string) => void) => void;
    volume?: number;
}

interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
        Player: new (options: SpotifyPlayerOptions) => SpotifyPlayer;
    };
}
