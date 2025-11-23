import os
import shutil
import json
from datetime import datetime

def backup_files(source_dir, dest_dir, include_exts=None):
    """
    Копирует файлы из source_dir в dest_dir, фильтруя по расширениям.
    """
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    report = {
        "timestamp": datetime.now().isoformat(),
        "source": source_dir,
        "destination": dest_dir,
        "copied_files": [],
        "skipped_files": []
    }

    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if include_exts and not any(file.endswith(ext) for ext in include_exts):
                report["skipped_files"].append(os.path.join(root, file))
                continue

            src_path = os.path.join(root, file)
            dest_path = os.path.join(dest_dir, os.path.relpath(src_path, source_dir))

            try:
                shutil.copy2(src_path, dest_path)
                report["copied_files"].append(dest_path)
            except Exception as e:
                report["skipped_files"].append({"file": src_path, "error": str(e)})

    return report

# Пример вызова
if __name__ == "__main__":
    result = backup_files("/vfs/docs", "/backups/docs", [".txt", ".pdf"])
    print(json.dumps(result, indent=2))
