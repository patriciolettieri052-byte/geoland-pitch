import os
import re

# List of currently used background media from slides.ts
used_files = [
    "ChatGPT Image 17 abr 2026, 09_14_30 p.m..png",
    "ChatGPT Image 17 abr 2026, 09_16_43 p.m..png",
    "ChatGPT Image 17 abr 2026, 09_18_58 p.m..png",
    "wasting_time.png",
    "ChatGPT Image 17 abr 2026, 09_23_25 p.m..png",
    "slide8.png",
    "ChatGPT Image 17 abr 2026, 09_24_30 p.m..png",
    "slide10.mp4",
    "ChatGPT Image 17 abr 2026, 09_26_10 p.m..png",
    "slide12.png",
    "slide13.png",
    "portada2.mp4",
    "Para_esta_escena_conviene_guia_Kling_26_Pro_26350.mp4",
    "ppo-kwph7jfcIwLKSajTd_output.mp4",
    "qrukBqIZnmLulKOkkLGpz_output.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_02361.mp4",
    "id21_22.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_09724.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_11752.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_11856.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_14333.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_19168.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_22119.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_26480.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_28460.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_29511.mp4",
    "analistas.png",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_42927.mp4",
    "campo.png",
    "universo.mp4",
    "ChatGPT Image 17 abr 2026, 09_25_33 p.m..png",
    "simplicity.mp4",
    "flaubert.mp4",
    "einstein.mp4",
    "newton.mp4",
    "steve.mp4",
    "bill.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_61696.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_66272.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_66939.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_68736.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_71658.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_82484.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_86109 (1).mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_90059.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_98900.mp4",
    "acceso.mp4",
    "objetivo.mp4",
    "ChatGPT Image 14 ene 2026, 05_36_39 p.m..png",
    "ChatGPT Image 19 abr 2026, 02_10_11 p.m..png",
    "ChatGPT Image 19 abr 2026, 02_11_28 p.m..png",
    "ChatGPT Image 19 abr 2026, 02_13_46 p.m..png",
    "ChatGPT Image 19 abr 2026, 02_16_08 p.m..png",
    "ChatGPT Image 19 abr 2026, 02_18_45 p.m..png",
    "A_lone_man_walking_slowly_towa_Kling_26_Pro_69842.mp4",
    "mercado1.mp4",
    "id68.mp4",
    "id69.mp4",
    "id70.mp4",
    "id71.mp4",
    "id72.mp4",
    "id108.mp4",
    "whitespace.mp4",
    "id77.mp4",
    "id80.mp4",
    "beforeteam.png",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_34123.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_44792.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_47631.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_52997.mp4",
    "Use_the_uploaded_image_as_the__Kling_26_Pro_60411.mp4",
    "id100.mp4"
]

source_dir = r"C:\Users\59892\.gemini\antigravity\scratch\presentacion-tailwind\materiales\fotos y videos"

available_files = []
for root, dirs, files in os.walk(source_dir):
    for file in files:
        available_files.append((file, os.path.join(root, file)))

print("--- UNUSED FILES ---")
unused = []
for name, path in available_files:
    if name not in used_files:
        unused.append((name, path))
        print(f"Name: {name} | Path: {path}")

print("\n--- SUMMARY ---")
print(f"Total available: {len(available_files)}")
print(f"Total used: {len(used_files)}")
print(f"Total unused: {len(unused)}")
