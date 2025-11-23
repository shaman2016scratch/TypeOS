import os
from PIL import Image
import numpy as np

def analyze_image(filepath):
    try:
        img = Image.open(filepath)
        width, height = img.size
        pixels = np.array(img)

        # Эвристика: ищем области с цветом кожи (упрощённо)
        skin_mask = ((pixels[:, :, 0] > 100) & 
                     (pixels[:, :, 1] > 50) &
                     (pixels[:, :, 2] < 100))
        skin_pixels = np.sum(skin_mask)

        has_faces = skin_pixels > 1000  # Условный порог

        return {
            "success": True,
            "width": width,
            "height": height,
            "has_faces": has_faces,
            "skin_pixels": int(skin_pixels)
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# Для тестирования из консоли
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        print(analyze_image(sys.argv[1]))
