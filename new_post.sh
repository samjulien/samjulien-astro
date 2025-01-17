#!/bin/zsh
# Astro post creator
if [ -f .env ]; then
    source .env
fi

new_post() {
  echo "Creating new post"
  ASTRO_ROOT=~/Dev/samjulien-astro
  ASTRO_POSTS=$ASTRO_ROOT/src/data/blog
  TITLE=$1
  SLUG="$(echo -n "$TITLE" | sed -e 's/[^[:alnum:]]/-/g' | tr -s '-' | tr A-Z a-z)"
  DATE="$(date +%Y-%m-%d)"
  NEW_POST_FOLDER=$ASTRO_POSTS/$DATE-$SLUG
  NEW_POST_FILE=$NEW_POST_FOLDER/index.mdx

  mkdir $NEW_POST_FOLDER
  mkdir $NEW_POST_FOLDER/images

  cat <<frontmatter > $NEW_POST_FILE
---
title: "$TITLE"
slug: "$SLUG"
description: ''
date: "$DATE"
date_updated: "$DATE"
ogimage: "images/og-$SLUG.png"
published: true
tags:
  - Tech
---
frontmatter

  ENCODED="$(urlencode "$TITLE")"

  wget -P ${NEW_POST_FOLDER}/images ${CLOUDINARY_BASE_URL}/image/upload/w_989,c_fit,g_north_west,x_60,y_60,l_text:Inter-Black.ttf_64:${ENCODED}/og-template.png

  mv "${NEW_POST_FOLDER}/images/og-template.png" "${NEW_POST_FOLDER}/images/og-${SLUG}.png"

  echo "New post created"
  cursor $ASTRO_ROOT
  cursor $NEW_POST_FILE
}

# https://gist.github.com/cdown/1163649
urlencode() {
    # urlencode <string>

    old_lc_collate=$LC_COLLATE
    LC_COLLATE=C

    local length="${#1}"
    for (( i = 0; i < length; i++ )); do
        local c="${1:$i:1}"
        case $c in
            [a-zA-Z0-9.~_-]) printf '%s' "$c" ;;
            *) printf '%%%02X' "'$c" ;;
        esac
    done

    LC_COLLATE=$old_lc_collate
}

new_post "$1"
