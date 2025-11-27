export class AssetManager {
    private static images: { [key: string]: HTMLImageElement } = {};
    private static toLoad: number = 0;
    private static loaded: number = 0;

    static loadImage(key: string, src: string) {
        const img = new Image();
        this.toLoad++;
        img.onload = () => {
            this.loaded++;
            this.images[key] = img; // Only store if loaded successfully
            console.log(`Loaded asset: ${key}`);
        };
        img.onerror = () => {
            this.loaded++; // Increment anyway to avoid hanging
            console.error(`Failed to load asset: ${key} from ${src}`);
        };
        img.src = src;
    }

    static getImage(key: string): HTMLImageElement {
        return this.images[key];
    }

    static isReady(): boolean {
        return this.toLoad > 0 && this.toLoad === this.loaded;
    }

    static preload(onComplete: () => void) {
        // Define assets here
        const baseUrl = import.meta.env.BASE_URL;
        const assets = [
            { key: 'Eagle', src: `${baseUrl}assets/eagle.png` },
            { key: 'Owl', src: `${baseUrl}assets/owl.png` },
            { key: 'Pidgeon', src: `${baseUrl}assets/pidgeon.png` },
            { key: 'Hummingbird', src: `${baseUrl}assets/hummingbird.png` },
            { key: 'Projectile', src: `${baseUrl}assets/projectile.png` },
            { key: 'Background', src: `${baseUrl}assets/background.png` },
            { key: 'Title', src: `${baseUrl}assets/title_logo.png` },
            { key: 'MenuBackground', src: `${baseUrl}assets/menu_background.jpg` },
        ];

        assets.forEach(a => this.loadImage(a.key, a.src));

        const check = setInterval(() => {
            if (this.isReady()) {
                clearInterval(check);
                onComplete();
            }
        }, 100);
    }
}
