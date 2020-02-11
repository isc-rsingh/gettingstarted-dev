<?php

$module_index = get_row_index();
$section_id = 'section-' . $module_index;

$title = get_sub_field('title');
$logos = get_sub_field('logos');

?>

<section class="featured-logos <?php echo $section_id; ?>">

	<?php include(locate_template('/templates/partials/module_settings.php')); ?>

		<?php if($title) : ?>
			<div class="featured-logos__title"><?php echo $title; ?></div>
		<?php endif; ?>	

		<?php if($logos) : ?>
			<div class="featured-logos__logos">
				<div class="row center-xs middle-xs">	
					<?php foreach($logos as $logo) : 

						$img = isc_get_attachment($logo['logo']);
						$max_width = $logo['max_width'] ? 'style="max-width:' . $logo['max_width'] . 'px;"' : '';

						?>
						<?php if($img) : ?>
							<div class="col-xs-6 col-sm-3">
								<div class="logo">
									<img src="<?php echo $img['src']; ?>" alt="<?php echo $img['alt']; ?>" <?php echo $max_width; ?>>
								</div>
							</div>
						<?php endif; ?>
					<?php endforeach; ?>
				</div>
			</div>
		<?php endif; ?>

</section>