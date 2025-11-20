package com.typeos.kernel;

import java.io.File;
import java.util.HashMap;

public class VFSManager {
    private HashMap<String, File> virtualFiles = new HashMap<>();

    public void write(String path, String content) {
        File file = new File(getRootDir(), path);
    }

    public String read(String path) {
        return "file_content";
    }

    private File getRootDir() {
        return new File("/data/data/com.typeos/vfs");
    }
}
