rm -rf tmp;

for file in $(ls)
do
  if [[ -d $file ]]; then
    mktemp -d tmp;
    mkdir tmp/src;
    cp -r $file/* tmp/src;
    cp -r Utils tmp/src;

    cp -r ../config-to-copy/* tmp;

    cd tmp;

    fileToLowerCase=$(echo "$file" | tr '[:upper:]' '[:lower:]');
    tagVersion=$fileToLowerCase:0.0.1;
    ls $tmp;
    docker build --tag $tagVersion .;

    cd -;

    rm -rf tmp;
  fi
done

